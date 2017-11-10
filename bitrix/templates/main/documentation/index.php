<?php   
    $request = $_SERVER['REQUEST_URI'];
    $valid = false;
    $contents = '';
    include('../includes/vendor/Parsedown.php');
    $parsedown = new Parsedown();
	$config = json_decode(file_get_contents(__DIR__ . '\config.json'), true);
    $pages = array();
	$iterator = new RecursiveIteratorIterator(
    	new RecursiveArrayIterator($config),
    	RecursiveIteratorIterator::SELF_FIRST
	);
	foreach ($iterator as $key => $children) {
		if (is_array($children) && $key === 'children') {
            foreach ($children as $child) {
                unset($child['children']);
                $pages[] = $child;
                if ($child['url'] === $request) {
                    $valid = true;
                    $contents = file_get_contents(__DIR__ . '\assets' . $child['file']);
                }
            }
		}
	}
    if (!$valid) {
        http_response_code(404);
        die();
    }
?>

<?php
    populate($config["children"]);
    function populate($pages) {
        echo '<ul>';
        foreach ($pages as $page) {
            if ($page["show"]) {
                echo '<li>';
                echo '<a href="'.$page["url"].'"';
                if ($page["url"] == $_SERVER['REQUEST_URI']) {
                    echo ' class="active"';
                }
                echo '>'.$page["menu"].'</a>';
                if (array_key_exists("children", $page)) {
                    populate($page["children"]);
                }
                echo '</li>';
            }
        }
        echo '</ul>';
    }
?>

<?php
    echo $parsedown->text($contents);
?>
 