using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IPasswordService
    {
        string HashPassword(User user, string password);
        bool VerifyPassword(User user, string password);
    }
}
