using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Dto
{
    public class RoomDesignRequestDto
    {
        public int RoomId { get; set; }
        public string? UserEmail { get; set; }
        public float RoomSize { get; set; }
        public float WallHeight { get; set; }
        public float WallThickness { get; set; }
        public string? WallColor { get; set; }
        public string? WallTexture { get; set; }
        public string? FloorTexture { get; set; }
        public string? ViewMode { get; set; }
        public string? DesignName { get; set; }
        public DateTime CreatedAt { get; set; } 

        public List<FurnitureRequestDto> Furnitures { get; set; } = new();
    }
}
