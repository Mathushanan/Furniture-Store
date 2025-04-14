using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;


namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly SystemDbContext _systemDbContext;

        public UserService(SystemDbContext systemDbContext)
        {
            this._systemDbContext = systemDbContext;
        }

        public async Task<int> AddUserAsync(User user)
        {
            await _systemDbContext.Users.AddAsync(user);
            await _systemDbContext.SaveChangesAsync();

            return user.UserId; // Assuming 'Id' is an integer
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _systemDbContext.Users
                .Where(user => user.Email == email)
                .FirstOrDefaultAsync();

        }




    }
}
