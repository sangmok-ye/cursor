		<ul class="pager_wrap" style="display: none">
				<li class="pager_top" onclick="pager_move_btn(-312)">위로</li>
				<li>
						<ul class="pager"></ul>
				</li>
				<li class="pager_bottom" onclick="pager_move_btn(312)">아래로</li>
		</ul><!-- .pager_wrap -->
		<div class="img_thums_wrap">
				<div class="img_thums">
						<?php include "inc/img_list.php"?>
				</div>
		</div>
		<div class="bg"></div>
		<div class="toast_m">
				<span>ESC 키를 누르면 축소됩니다.</span>
		</div>
	</div><!-- #wrap -->
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="js/main.js"></script>
</html>