using backend.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Services
{
    public class JwtService : IJwtService
    {
        public string GenerateJwtToken(User user)
        {
            // Create a signing security key
            var secretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("JWT_SECRET_KEY environment variable is not set.");
            }
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            // Create credentials for signing
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Create a new claim list
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("FirstName", user.FirstName?? ""),
                new Claim("LastName", user.LastName?? ""),
                new Claim("UserType", user.UserType ?? ""),
                new Claim("Gender", user.Gender ?? ""),
                new Claim("Address", user.Address ?? ""),
                new Claim("Email",user.Email ?? ""),
                new Claim("ContactNumber",user.ContactNumber ?? "")
            };

            // Create a new token
            var token = new JwtSecurityToken(
                issuer: Environment.GetEnvironmentVariable("JWT_ISSUER"),
                audience: Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
                claims: claims,
                expires: DateTime.Now.AddMinutes(int.Parse(Environment.GetEnvironmentVariable("JWT_EXPIRATION_MINUTES") ?? "30")),
                signingCredentials: credentials);

            // Serialize the JWT & send as string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public ClaimsPrincipal? ValidateJwtToken(string token)
        {
            var secretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("Environment variable is not set!");
            }
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER"),
                ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
                IssuerSigningKey = securityKey
            };

            try
            {
                var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                return principal;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string? GetUserEmailFromToken(string token)
        {
            var principal = ValidateJwtToken(token);
            return principal?.Claims.FirstOrDefault(c => c.Type == "Email")?.Value;

        }

    }
}
