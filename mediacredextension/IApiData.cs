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

        [Post("/mediacredapi/createauthor")]
        Task CreateAuthor([Query]Article article, [Query] Author author);

        [Post("/mediacredapi/createargument")]
        Task CreateArgument([Query] Article article, [Query] Argument argument);

        [Post("/mediacredapi/createbacking")]
        Task CreateBacking([Query] Article article, [Query] Argument argument);
    }
}
