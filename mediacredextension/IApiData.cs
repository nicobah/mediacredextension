using MediaCred;
using Refit;
using System.Threading.Tasks;

namespace mediacredextension
{
    public interface IApiData
    {

        [Get("/mediacredapi/getlinkinfo")]
        Task<string> GetLinkInfo(string url);

        [Post("/mediacredapi/createarticle")]
        Task CreateArticle(Article art);

        [Get("/mediacredapi/getlinktoulmin")]
        Task<string> GetLinkToulmin(string url);

    }
}
