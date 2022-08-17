<?php include "inc/header.php"?>
<div id="container">
	<section class="img_wrap">
		<?php include "inc/img_list.php"?>
	</section><!-- .img_wrap -->
	<div class="prev btn disable" onclick="prev_btn()"><img src="img/right.png"></div>
	<div class="next btn" onclick="next_btn()"><img src="img/right.png"></div>
	<section class="mini_view_wrap">
		<ul></ul>
		<div class="view"></div>
	</section>
</div><!-- #container -->
<?php include "inc/footer.php"?>