using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Services
{
    public class RoomDesignService:IRoomDesignService
    {
        private readonly SystemDbContext _systemDbContext;

        public RoomDesignService(SystemDbContext systemDbContext)
        {
            this._systemDbContext = systemDbContext;
            
        }

        public async Task<RoomDesign> AddRooomDesignAsync(RoomDesign roomDesign)
        {
            _systemDbContext.RoomDesigns.Add(roomDesign);
            await _systemDbContext.SaveChangesAsync();
            return roomDesign;
        }
        public async Task<RoomDesign?> GetRoomDesignByUserIdAndNameAsync(int userId, string designName)
        {
            return await _systemDbContext.RoomDesigns
                .FirstOrDefaultAsync(rd => rd.UserId == userId && rd.DesignName == designName);
        }
        public async Task<List<RoomDesign>> GetRoomDesignsByUserIdAsync(int userId)
        {
            return await _systemDbContext.RoomDesigns
                .Where(r => r.UserId == userId)
                .ToListAsync();
        }

    }
}
