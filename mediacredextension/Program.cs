﻿using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using MudBlazor.Services;
using Refit;

namespace mediacredextension
{
    public static class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#kand_extension_uid");
            builder.RootComponents.Add<HeadOutlet>("head::after");

            builder.Services.AddRefitClient<IApiData>().ConfigureHttpClient(x => x.BaseAddress = new Uri("https://mediacred-rswnzpohoq-ew.a.run.app"));
            builder.Services.AddMudServices();
            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

            builder.Services.AddBrowserExtensionServices();
            await builder.Build().RunAsync();
        }
    }
}
