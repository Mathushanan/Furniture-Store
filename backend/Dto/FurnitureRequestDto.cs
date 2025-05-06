using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Dto
{
    public class FurnitureRequestDto
    {
        public int FurnitureId { get; set; }
        public int RoomId { get; set; }
        public string? Type { get; set; }
        public float[]? Position { get; set; }
        public string? Color { get; set; }
        public float[]? Size { get; set; }
        public string? Shade { get; set; }
        public bool Shadow { get; set; }
    }
}
