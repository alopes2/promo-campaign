using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using PromoCampaign.Core.Models;

namespace PromoCampaign.Core.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<Campaign> ApplyFiltering(this IQueryable<Campaign> query, CampaignQuery queryObj) 
        {
            if (queryObj.IsActive.HasValue) {
                if (!queryObj.IsActive.Value) {
                    // return campaigns that IsActive is false and today is after end date
                    query = query.Where(v => !v.IsActive || v.End.CompareTo(DateTime.Now) < 0);
                } else {
                    // return campaigns that IsActive is true and today is before end date
                    query = query.Where(v => v.IsActive && v.End.CompareTo(DateTime.Now) > 0);
                }
                
            }

            return query;
        }
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObj, Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (String.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMap.ContainsKey(queryObj.SortBy)) {
                return query;
            }

            if (queryObj.Ascending) {
                return query.OrderBy(columnsMap[queryObj.SortBy]);
            } 

            return query.OrderByDescending(columnsMap[queryObj.SortBy]);
        }
        
        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, IQueryObject queryObj)
        {
            if (queryObj.PageSize <= 0) 
                queryObj.PageSize = 10;

            if (queryObj.Page <= 0) 
                queryObj.Page = 1;

            return query
                .Skip((queryObj.Page - 1) * queryObj.PageSize)
                .Take(queryObj.PageSize);
        }
    }
}