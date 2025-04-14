using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IJwtService
    {
        string GenerateJwtToken(User user);
        ClaimsPrincipal? ValidateJwtToken(string token);
        public string? GetUserEmailFromToken(string token);
    }
}
