<ul class="img_list main">
  <?php 
		$dir = 'img/page';
		$count= count(scandir($dir)) - 1;
		for($i=1;$i<$count;$i++){
			echo '<li><img src="'.$dir.'/ebook_'.$i.'.jpg"></li>';
		}
  ?>
</ul>