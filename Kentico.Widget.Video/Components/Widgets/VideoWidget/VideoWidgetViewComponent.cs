﻿using CMS;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewComponents;

using Kentico.PageBuilder.Web.Mvc;
using Kentico.Widget.Video.Components.Widgets;

[assembly: RegisterWidget(VideoWidgetViewComponent.IDENTIFIER, typeof(VideoWidgetViewComponent), "{$Kentico.Widget.Video.Name$}", typeof(VideoWidgetProperties), Description = "{$Kentico.Widget.Video.Description$}", IconClass = "icon-brand-youtube")]

namespace Kentico.Widget.Video.Components.Widgets
{
    public class VideoWidgetViewComponent : ViewComponent
    {
        /// <summary>
        /// Widget identifier.
        /// </summary>
        public const string IDENTIFIER = "Kentico.Widget.Video";


        public ViewViewComponentResult Invoke(VideoWidgetProperties properties)
        {
            var viewModel = VideoHelper.GetVideoModel(properties.VideoUrl);

            return View("~/Components/Widgets/VideoWidget/_VideoWidget.cshtml", viewModel);
        }
    }
}