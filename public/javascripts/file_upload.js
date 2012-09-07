/**
 * Created with JetBrains WebStorm.
 * User: marshal
 * Date: 12-9-6
 * Time: 下午3:38
 * To change this template use File | Settings | File Templates.
 */

function init(fileInput, uploadButton) {
    fileInput.on('change', function () {
        console.log(this);
        uploadButton.prop('disabled', true);
        if (!this.files[0]) return;
        var file = this.files[0];
        console.log(file);
        uploadButton.prop('disabled', false);

        if (file.type.indexOf('image') == 0) {

            var fileReader = new FileReader();
            fileReader.onload = (function () {
                return function (e) {
                    var image = new Image();
                    image.src = e.target.result;
                    $(image).appendTo($('#showImage'));
                }
            })();
            fileReader.readAsDataURL(file);
        }
    });

    uploadButton.on('click', function () {
        var file = fileInput[0].files[0];
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/upload");
        xhr.onload = function (e) {
            uploadButton.prop('disabled', true);
            $('#showImage').empty();
            $('#progress').empty();
            fileInput.val('');
        };
        var formData = new FormData();
        formData.append('imageFile', file);

        var progress = $('<progress min="0" max="100" value="0" id="aaa">0% complete</progress>');
        progress.appendTo($('#progress'));

        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                console.log(e.loaded);
                $('#progress').children()[0].value = (e.loaded / e.total) * 100;
            }
        };

        xhr.send(formData);

    });
}