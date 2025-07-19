using Bhavna.Web.API.DdContextConfiguration;
using Bhavna.Web.API.Interfaces;
using Bhavna.Web.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;

namespace Bhavna.Web.API.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDBContext _dbcontext;
        private const string CacheKey = "productCacheKey";
        private readonly IDistributedCache _distributedCache;
        private readonly DistributedCacheEntryOptions _cacheEntryOptions;
        public ProductRepository(ApplicationDBContext _dbcontext, IDistributedCache _distributedCache)
        {
            this._dbcontext = _dbcontext;
            this._distributedCache = _distributedCache;
            _cacheEntryOptions = new DistributedCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(60))
                .SetSlidingExpiration(TimeSpan.FromMinutes(5));

        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            try
            {
                var CaheData = await _distributedCache.GetStringAsync(CacheKey);
                if (CaheData != null)
                {

                    return JsonSerializer.Deserialize<IEnumerable<Product>>(CaheData);
                }

                var products = await _dbcontext.products.ToListAsync();
                var serializedData = JsonSerializer.Serialize(products);
                await _distributedCache.SetStringAsync(CacheKey, serializedData, _cacheEntryOptions);
                return products;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }

}
