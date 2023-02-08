using Microsoft.AspNetCore.Mvc;
using System;
using Neo4j.Driver;

namespace MediaCredibilityAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {

        private bool _disposed = false;
        private readonly IDriver _driver;
        //public DriverIntroductionExample(string uri, string user, string password)
        //{
        //    _driver = GraphDatabase.Driver(uri, AuthTokens.Basic(user, password));
        //}

        private readonly ILogger<WeatherForecastController> _logger;

       

        public WeatherForecastController()
        {
            _driver = GraphDatabase.Driver("neo4j+s://64d3b06c.databases.neo4j.io", AuthTokens.Basic("neo4j", "k7by2DDGbQvb98r5geSqJMLf1TRBlL_EWeGHqhrxn8M"));

        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task Get()
        {

            var uri = "neo4j+s://64d3b06c.databases.neo4j.io";

            var user = "neo4j";
            var password = "k7by2DDGbQvb98r5geSqJMLf1TRBlL_EWeGHqhrxn8M";
            var w = new WeatherForecastController();
            await w.CreateFriendship("N", "p");
        }

        private async Task CreateFriendship(string person1Name, string person2Name)
        {
            // To learn more about the Cypher syntax, see https://neo4j.com/docs/cypher-manual/current/
            // The Reference Card is also a good resource for keywords https://neo4j.com/docs/cypher-refcard/current/
            var query = @"
        MERGE (p1:Person { name: $person1Name })
        MERGE (p2:Person { name: $person2Name })
        MERGE (p1)-[:KNOWS]->(p2)
        RETURN p1, p2";

            await using var session = _driver.AsyncSession(configBuilder => configBuilder.WithDatabase("neo4j"));
            try
            {
                // Write transactions allow the driver to handle retries and transient error
                var writeResults = await session.ExecuteWriteAsync(async tx =>
                {
                    var result = await tx.RunAsync(query, new { person1Name, person2Name });
                    return await result.ToListAsync();
                });

                foreach (var result in writeResults)
                {
                    var person1 = result["p1"].As<INode>().Properties["name"];
                    var person2 = result["p2"].As<INode>().Properties["name"];
                    Console.WriteLine($"Created friendship between: {person1}, {person2}");
                }
            }
            // Capture any errors along with the query and data for traceability
            catch (Neo4jException ex)
            {
                Console.WriteLine($"{query} - {ex}");
                throw;
            }
        }
    }
}