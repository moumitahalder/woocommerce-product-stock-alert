<?php

if (!defined('ABSPATH'))
    exit;

/**
 * @class 		MVX Template Class
 *
 * @version		2.2.0
 * @package		MultivendorX
 * @author 		MultiVendorX
 */
class WOO_Product_Stock_Alert_Template {

    public $template_url;

    public function __construct() {
        $this->template_url = 'woo-stock-alert/';
    }

    /**
     * Get other templates (e.g. product attributes) passing attributes and including the file.
     *
     * @access public
     * @param mixed $template_name
     * @param array $args (default: array())
     * @param string $template_path (default: '')
     * @param string $default_path (default: '')
     * @return void
     */
    public function get_template($template_name, $args = array(), $template_path = '', $default_path = '') {

        if ($args && is_array($args))
            extract($args);

        $located = $this->locate_template($template_name, $template_path, $default_path);

        include ($located);
    }

    /**
     * Locate a template and return the path for inclusion.
     *
     * This is the load order:
     *
     * 		yourtheme		/	$template_path	/	$template_name
     * 		yourtheme		/	$template_name
     * 		$default_path	/	$template_name
     *
     * @access public
     * @param mixed $template_name
     * @param string $template_path (default: '')
     * @param string $default_path (default: '')
     * @return string
     */
    public function locate_template($template_name, $template_path = '', $default_path = '') {
        global $woocommerce, $WOO_Product_Stock_Alert;
        $default_path = apply_filters('template_path', $default_path);
        if (!$template_path) {
            $template_path = $this->template_url;
        }
        if (!$default_path) {
            $default_path = $WOO_Product_Stock_Alert->plugin_path . 'templates/';
        }
        // Look within passed path within the theme - this is priority
        $template = locate_template(array(trailingslashit($template_path) . $template_name, $template_name));
        // Add support of third perty plugin
        $template = apply_filters('mvx_locate_template', $template, $template_name, $template_path, $default_path);
        // Get default template
        if (!$template) {
            $template = $default_path . $template_name;
        }

        
        return $template;
    }

    /**
     * Get store templates (e.g. product attributes) passing attributes and including the file.
     *
     * @access public
     * @param mixed $template_name
     * @param array $args (default: array())
     * @param string $template_path (default: '')
     * @param string $default_path (default: '')
     * @return void
     */
    public function get_store_template($template_name, $args = array(), $template_path = '', $default_path = '') {
        if ($args && is_array($args))
            extract($args);
        $located = $this->store_locate_template($template_name, $template_path, $default_path);
        include ($located);
    }

    public function store_locate_template($template_name, $template_path = '', $default_path = '') {
        global $woocommerce, $WOO_Product_Stock_Alert;
        $default_path = apply_filters('template_path', $default_path);
        if (!$template_path) {
            $template_path = $this->template_url;
        }
        if (!$default_path) {
            $default_path = $WOO_Product_Stock_Alert->plugin_path . 'templates/';
        }
        // Look within passed path within the theme - this is priority
        $template = locate_template(array(trailingslashit($template_path) . $template_name, $template_name));
        // Add support of third perty plugin
        $template = apply_filters('mvx_store_locate_template', $template, $template_name, $template_path, $default_path);
        // Get default template
        if (!$template) {
            $template = $default_path . $template_name;
        }
        return $template;
    }

    /**
     * Get template part (for templates like the shop-loop).
     *
     * @access public
     * @param mixed $slug
     * @param string $name (default: '')
     * @return void
     */
    public function get_template_part($slug, $name = '') {
        global $WOO_Product_Stock_Alert;
        $template = '';

        // Look in yourtheme/slug-name.php and yourtheme/woocommerce/slug-name.php
        if ($name)
            $template = $this->locate_template(array("{$slug}-{$name}.php", "{$this->template_url}{$slug}-{$name}.php"));

        // Get default slug-name.php
        if (!$template && $name && file_exists($WOO_Product_Stock_Alert->plugin_path . "templates/{$slug}-{$name}.php"))
            $template = $WOO_Product_Stock_Alert->plugin_path . "templates/{$slug}-{$name}.php";

        // If template file doesn't exist, look in yourtheme/slug.php and yourtheme/woocommerce/slug.php
        if (!$template)
            $template = $this->locate_template(array("{$slug}.php", "{$this->template_url}{$slug}.php"));

        echo $template;

        if ($template)
            load_template($template, false);
    }

}
