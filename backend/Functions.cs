using backend.Dtos;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace backend
{
    public class Functions
    {
        private readonly ILogger<Functions> _logger;
        private readonly IPasswordService _passwordService;
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;

        public Functions(ILogger<Functions> logger, IPasswordService passwordService, IUserService userService, IJwtService jwtService)
        {
            _logger = logger;
            this._passwordService = passwordService;
            this._userService = userService;
            this._jwtService = jwtService;
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
                       

                        if (firstName == null || lastName == null || gender == null || address == null || contactNumber == null || password == null || email == null  || userType == null )
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
    }
}
