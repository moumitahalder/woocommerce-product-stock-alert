jQuery(document).ready(function($) {
  $('.wc_stock_alert_export_data').on('click',function(){
		document.location.href = ajaxurl + '?action=export_subscribers';
  });
});