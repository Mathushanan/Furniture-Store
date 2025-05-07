using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IRoomDesignService
    {
        Task<RoomDesign> AddRooomDesignAsync(RoomDesign roomDesign);
        Task<RoomDesign?> GetRoomDesignByUserIdAndNameAsync(int userId, string designName);
        Task<List<RoomDesign>> GetRoomDesignsByUserIdAsync(int userId);
    }
}
