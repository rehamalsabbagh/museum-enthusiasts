// function readURL(input) {
//     if (input.files && input.files[0]) {
//       var reader = new FileReader();
//       reader.onload = function (e) {
//         $('#blah')
//           .attr('src', e.target.result)
//           .width(150)
//           .height(200);
//       };
//       reader.readAsDataURL(input.files[0]);
//     }
//   }

class InputUtil {
  static uploadFileToServer(event, assign) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function () {
      assign('https://www.flaticon.com/svg/static/icons/svg/864/864380.svg');
      console.log(btoa(reader.result));
    };
    reader.onerror = function () {
      console.log('there are some problems');
    };
  }
}

export default InputUtil;
