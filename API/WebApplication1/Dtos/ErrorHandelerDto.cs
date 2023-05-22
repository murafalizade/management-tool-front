using System.Text.Json.Serialization;

namespace WebApplication1.Dtos{
    public class ErrorHandelerDto{
        [JsonIgnore]
        public bool? isError { get; set; } = false;
        [JsonIgnore]
        public int StatusCode { get; set; }
        public object data { get; set; }
    }
}