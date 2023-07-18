using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class XariciDil
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Percentage { get; set; }
    }
}