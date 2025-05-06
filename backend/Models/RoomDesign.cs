using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Models
{
    public class RoomDesign
    {
        public int RoomId { get; set; }
        public int UserId { get; set; }
        public virtual User? User { get; set; }
        public float RoomSize { get; set; }
        public float WallHeight { get; set; }
        public float WallThickness { get; set; }
        public string? WallColor { get; set; }
        public string? WallTexture { get; set; }
        public string? FloorTexture { get; set; }
        public string? ViewMode { get; set; } = "3D";
        public string? DesignName { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual ICollection<Furniture> Furnitures { get; set; } = new List<Furniture>();
    }
}
