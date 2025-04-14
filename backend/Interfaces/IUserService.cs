using backend.Data;
using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IUserService
    {
        Task<User?> GetUserByEmailAsync(string email);

        Task<int> AddUserAsync(User user);



    }
}
