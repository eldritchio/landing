# Depends on jQuery
$("#scroll-button").click ->
  $("html, body").animate
    scrollTop: $("#about").offset().top
  , "slow"
