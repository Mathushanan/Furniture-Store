using backend.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Services
{
    public class PasswordService : IPasswordService
    {
        private readonly PasswordHasher<User> _passwordHasher;

        public PasswordService()
        {
            _passwordHasher = new PasswordHasher<User>();
        }

        public string HashPassword(User user, string password)
        {
            return _passwordHasher.HashPassword(user, password);
        }

        public bool VerifyPassword(User user, string password)
        {
            if (user?.PasswordHash == null)
            {
                return false;
            }
            PasswordVerificationResult result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
            return result == PasswordVerificationResult.Success;
        }

    }
}
