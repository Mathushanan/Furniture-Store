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
    public class FurnitureService:IFurnitureService
    {
        private readonly SystemDbContext _systemDbContext;

        public FurnitureService(SystemDbContext systemDbContext)
        {
            this._systemDbContext = systemDbContext;

        }

        public async Task<Furniture> AddFurnitureAsync(Furniture furniture)
        {
            _systemDbContext.Furnitures.Add(furniture);
            await _systemDbContext.SaveChangesAsync();
            return furniture;
        }

        public async Task<List<Furniture>> GetFurnituresByRoomIdAsync(int roomId)
        {
            return await _systemDbContext.Furnitures
                .Where(f => f.RoomId == roomId)
                .ToListAsync();
        }
    }
}
