using backend.Dto;
using backend.Dtos;
using backend.Interfaces;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using static System.Collections.Specialized.BitVector32;

namespace backend
{
    public class Functions
    {
        private readonly ILogger<Functions> _logger;
        private readonly IPasswordService _passwordService;
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;
        private readonly IFurnitureService _furnitureService;
        private readonly IRoomDesignService _roomDesignService;



        public Functions(ILogger<Functions> logger, IPasswordService passwordService, IUserService userService, IJwtService jwtService, IRoomDesignService roomDesignService, IFurnitureService furnitureService)
        {
            _logger = logger;
            this._passwordService = passwordService;
            this._userService = userService;
            this._jwtService = jwtService;
            this._roomDesignService = roomDesignService;
            this._furnitureService = furnitureService;
        }

        [Function("RegisterUser")]
        public async Task<IActionResult> RegisterUser([HttpTrigger(AuthorizationLevel.Function, "post", Route = "register-user")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            try
            {



                // Read and deserialize the JSON request body
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var data = JsonConvert.DeserializeObject<UserRequestDto>(requestBody);

                if (data == null)
                {
                    return new BadRequestObjectResult("Invalid JSON request body.");
                }

                //Accessing deserialized parameters
                string? userType = data.UserType;
                string? firstName = data.FirstName;
                string? lastName = data.LastName;
                string? gender = data.Gender;

                string? address = data.Address;
                string? email = data.Email;
                string? contactNumber = data.ContactNumber;
                string? password = data.Password;


                if (firstName == null || lastName == null || gender == null || address == null || contactNumber == null || password == null || email == null || userType == null)
                {
                    return new BadRequestObjectResult("Invalid JSON request body. Required fields are missing/User type is wrong!");
                }
                else
                {
                    var existingUser = await _userService.GetUserByEmailAsync(email);

                    if (existingUser != null)
                    {
                        return new ConflictObjectResult("User already registered!");
                    }
                    else
                    {
                        var newUser = new User
                        {
                            UserType = userType,
                            FirstName = firstName,
                            LastName = lastName,
                            Gender = gender,
                            Address = address,
                            Email = email,
                            ContactNumber = contactNumber,

                        };

                        newUser.PasswordHash = _passwordService.HashPassword(newUser, password!);
                        await _userService.AddUserAsync(newUser);
                        return new OkObjectResult("User registered successfully!");

                    }

                }







            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500
                };
            }
        }

        [Function("Login")]
        public async Task<IActionResult> Login([HttpTrigger(AuthorizationLevel.Function, "post", Route = "login")] HttpRequest req)
        {
            // Read and deserialize the JSON request body
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<UserRequestDto>(requestBody);

            if (data == null)
            {
                return new BadRequestObjectResult("Invalid JSON request body!");
            }

            //Accessing deserialized parameters
            string? email = data.Email;
            string? password = data.Password;

            var existingUser = await _userService.GetUserByEmailAsync(email!);
            if (existingUser == null)
            {
                return new NotFoundObjectResult("User not registered yet!");
            }
            else
            {
                if (_passwordService.VerifyPassword(existingUser, password!))
                {
                    var jwt = _jwtService.GenerateJwtToken(existingUser);
                    return new OkObjectResult(new
                    {
                        Message = "Login successful!",
                        Token = jwt
                    });
                }
                else
                {
                    return new BadRequestObjectResult("Invalid password!");
                }
            }


        }
        [Function("SaveDesign")]
        public async Task<IActionResult> SaveDesign([HttpTrigger(AuthorizationLevel.Function, "post", Route = "save-design")] HttpRequest req)
        {
            try
            {

                if (!req.Headers.TryGetValue("Authorization", out var token))
                {
                    return new BadRequestObjectResult("Missing Authorization token!");
                }
                token = token.ToString().Replace("Bearer ", "");

                var principal = _jwtService.ValidateJwtToken(token!);

                if (principal != null)
                {
                    var claims = principal.Claims;
                    var userRole = claims.FirstOrDefault(c => c.Type == "UserType")?.Value;
                    if (userRole == "admin" || userRole == "customer")
                    {
                        // Read and deserialize the JSON request body
                        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                        var data = JsonConvert.DeserializeObject<RoomDesignRequestDto>(requestBody);

                        if (data == null)
                        {
                            return new BadRequestObjectResult("Invalid JSON request body!");
                        }
                        string? userEmail = data.UserEmail;
                        var user = await _userService.GetUserByEmailAsync(userEmail!);

                        int userId = user!.UserId;
                        float roomSize = data.RoomSize;
                        float wallHeight = data.WallHeight;
                        float wallThickness = data.WallThickness;
                        string? wallColor = data.WallColor;
                        string? wallTexture = data.WallTexture;
                        string? floorTexture = data.FloorTexture;
                        string? viewMode = data.ViewMode;
                        string? designName = data.DesignName;
                        DateTime createdAt = DateTime.UtcNow;

                        var existingRoomDesign = await _roomDesignService.GetRoomDesignByUserIdAndNameAsync(userId, designName!);
                        if (existingRoomDesign != null)
                        {
                            return new ConflictObjectResult("Room design with this name already exists!");
                        }
                        if (wallColor == null || wallTexture == null || floorTexture == null || viewMode == null)
                        {
                            return new BadRequestObjectResult("Invalid JSON request body. Required fields are missing!");
                        }
                        else
                        {

                            // Use RoomDesignService to save the RoomDesign data
                            var roomDesign = new RoomDesign
                            {
                                UserId = userId,
                                RoomSize = roomSize,
                                WallHeight = wallHeight,
                                WallThickness = wallThickness,
                                WallColor = wallColor,
                                WallTexture = wallTexture,
                                FloorTexture = floorTexture,
                                ViewMode = viewMode,
                                DesignName = designName,
                                CreatedAt = createdAt


                            };

                            // Save room design (assuming you have a RoomDesignService with a Save method)
                            var savedRoomDesign = await _roomDesignService.AddRooomDesignAsync(roomDesign);

                            //Accessing deserialized parameters
                            // Save all furniture related to the room design
                            foreach (var furnitureData in data.Furnitures)
                            {
                                var furniture = new Furniture
                                {
                                    RoomId = savedRoomDesign.RoomId,
                                    Type = furnitureData.Type,
                                    PositionX = furnitureData.Position[0],
                                    PositionY = furnitureData.Position[1],
                                    PositionZ = furnitureData.Position[2],
                                    Color = furnitureData.Color,
                                    SizeWidth = furnitureData?.Size[0],
                                    SizeHeight = furnitureData?.Size[1],
                                    SizeLength = furnitureData?.Size[2],
                                    Shade = furnitureData?.Shade,
                                    Shadow = furnitureData!.Shadow
                                };

                                // Use FurnitureService to save the furniture item (assuming you have a FurnitureService)
                                await _furnitureService.AddFurnitureAsync(furniture);
                            }
                            return new OkObjectResult("Design saved successfully!");
                        }

                    }
                    else
                    {
                        return new BadRequestObjectResult("User is not authorized for this action!");
                    }
                }
                else
                {
                    return new BadRequestObjectResult("Token is invalid or expired!");
                }
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500
                };

            }
        }
        [Function("GetDesigns")]
        public async Task<IActionResult> GetDesigns([HttpTrigger(AuthorizationLevel.Function, "get", Route = "get-designs")] HttpRequest req)
        {
            try
            {
                if (!req.Headers.TryGetValue("Authorization", out var token))
                {
                    return new BadRequestObjectResult("Missing Authorization token!");
                }

                token = token.ToString().Replace("Bearer ", "");
                var principal = _jwtService.ValidateJwtToken(token!);

                if (principal == null)
                {
                    return new BadRequestObjectResult("Token is invalid or expired!");
                }

                var claims = principal.Claims;
                var userRole = claims.FirstOrDefault(c => c.Type == "UserType")?.Value;
                var userEmail = claims.FirstOrDefault(c => c.Type == "Email")?.Value;

                if (userRole != "admin" && userRole != "customer")
                {
                    return new BadRequestObjectResult("User is not authorized for this action!");
                }

                var user = await _userService.GetUserByEmailAsync(userEmail!);
                if (user == null)
                {
                    return new NotFoundObjectResult("User not found.");
                }

                int userId = user.UserId;
                var roomDesigns = await _roomDesignService.GetRoomDesignsByUserIdAsync(userId);

                var result = new List<object>();

                foreach (var design in roomDesigns)
                {
                    var furnitures = await _furnitureService.GetFurnituresByRoomIdAsync(design.RoomId);

                    var furnitureDtos = furnitures.Select(f => new
                    {
                        f.Type,
                        Position = new[] { f.PositionX, f.PositionY, f.PositionZ },
                        Size = new[] { f.SizeWidth, f.SizeHeight, f.SizeLength },
                        f.Color,
                        f.Shade,
                        f.Shadow
                    });

                    result.Add(new
                    {
                        design.RoomId,
                        design.DesignName,
                        design.RoomSize,
                        design.WallHeight,
                        design.WallThickness,
                        design.WallColor,
                        design.WallTexture,
                        design.FloorTexture,
                        design.ViewMode,
                        design.CreatedAt,
                        Furnitures = furnitureDtos
                    });
                }

                return new OkObjectResult(result);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

    }
}
