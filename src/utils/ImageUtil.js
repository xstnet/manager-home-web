/**
 *
 * Created by PhpStorm.
 * Author: Shantong Xu <shantongxu@qq.com>
 * Date: 2019/9/10
 * Time: 16:46
 */


class ImageUtil {
	static compressImage(file, fileUrl, index, callback) {

		if (file.size / 1024 < 200) {
			callback(index, fileUrl, file);
			return true;
		}
		/*
         * file:input上传图片
         * backData：处理完成回调函数
         * */
		let reader = new FileReader();
		let image = new Image();
		let canvas = this.createCanvas();
		let ctx = canvas.getContext("2d");
		reader.onload = function () { // 文件加载完处理
			let result = this.result;
			image.onload = function () { // 图片加载完处理
				let imgScale = ImageUtil.imgScaleW(this.width, this.height);
				canvas.width = imgScale.width;
				canvas.height = imgScale.height;
				ctx.drawImage(image, 0, 0, imgScale.width, imgScale.height);
				let dataUrl = canvas.toDataURL('image/jpeg'); // 图片base64
				ctx.clearRect(0, 0, imgScale.width, imgScale.height); // 清除画布

				callback(index, dataUrl, file); //dataURL:处理成功返回的图片base64
			}
			image.src = result;
		};
		reader.readAsDataURL(file);
	}

	static createCanvas = () => { // 创建画布
		let canvas = document.getElementById('canvas');
		if (!canvas) {
			let canvasTag = document.createElement('canvas');
			canvasTag.setAttribute('id', 'canvas');
			canvasTag.setAttribute('style', 'display:none;');//隐藏画布
			document.body.appendChild(canvasTag);
			canvas = document.getElementById('canvas');
		}
		return canvas;
	}

	static imgScaleW = (width, height) => {
		/* maxWidth:宽度或者高度最大值
         * width：宽度
         * height：高度
         * */
		let maxWidth = 1000;

		let imgScale = {};
		let w = 0;
		let h = 0;
		if (width <= maxWidth && height <= maxWidth) { // 如果图片宽高都小于限制的最大值,不用缩放
			imgScale = {
				width: width,
				height: height
			}
		} else {
			if (width >= height) { // 如果图片宽大于高
				w = maxWidth;
				h = Math.ceil(maxWidth * height / width);
			} else {     // 如果图片高大于宽
				h = maxWidth;
				w = Math.ceil(maxWidth * width / height);
			}
			imgScale = {
				width: w,
				height: h
			}
		}
		return imgScale;
	}

	// 将base64转换为文件，dataUrl 为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
	static dataURLtoFile(dataUrl, filename) {
		let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
			bStr = atob(arr[1]), n = bStr.length, u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bStr.charCodeAt(n);
		}
		return new File([u8arr], filename, {type:mime});
	}
}

export default ImageUtil;