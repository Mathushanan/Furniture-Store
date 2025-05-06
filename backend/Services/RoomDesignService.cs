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
    }
}
