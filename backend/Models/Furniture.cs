using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Furniture
    {
       
        public int FurnitureId { get; set; }
        public int RoomId { get; set; }
        public string? Type { get; set; }
        public float PositionX { get; set; }
        public float PositionY { get; set; }
        public float PositionZ { get; set; }
        public string? Color { get; set; }
        public float? SizeWidth { get; set; }
        public float? SizeHeight { get; set; }
        public float? SizeLength { get; set; }
        public string? Shade { get; set; }
        public bool Shadow { get; set; }
        public virtual RoomDesign? RoomDesign { get; set; }
    }
}
