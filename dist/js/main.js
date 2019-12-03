
jQuery('.unitSelectValue').html('毫米');

var unitNumber = 1;

document.getElementById('unitSelectView').addEventListener('change', function () {
    var result = jQuery('#unitSelectView').val();
    jQuery('.unitSelectValue').html(result);
});

function runEveM() {

    // 单位毫米 mm

    // 总长度
    var allLenght = parseFloat(jQuery('#allLenInput').val());

    // 厚度
    var thickness = parseFloat(jQuery('#thickneessInput').val());

    // 圆柱直径
    var circleL = parseFloat(jQuery('#circleLenInput').val());

    // 伸缩误差
    var deviationInput = jQuery('#deviationInput').val() ? parseFloat(jQuery('#deviationInput').val()) : 1;

    thickness=thickness*deviationInput;

    // 预计圈数
    var tempCircleNumber = 5000;

    var toastBtn = jQuery('#toastBtn');

    if (allLenght && thickness && circleL) {

        // 直径数组
        var Darr = [];
        Darr[0] = thickness * 2 + circleL;
        for (var i = 1; i < tempCircleNumber; i++) {
            Darr[i] = thickness * 2 + Darr[i - 1];
        }

        // 周长数组
        var Carr = [];
        Carr[0] = Math.PI * Darr[0];
        for (var i = 1; i < tempCircleNumber; i++) {
            Carr[i] = Math.PI * Darr[i];
        }

        // 主计算函数
        var index = 0;
        // 当前累计长度
        var currentLen = 0;
        runEve();
        function runEve() {
            if (currentLen < allLenght) {
                currentLen = currentLen + Carr[index];
                index = index + 1;
                runEve();
            } else {
                jQuery('#result1').html(allLenght);
                jQuery('#result2').html(Darr[index]);
                jQuery('#result3').html(index);
                jQuery('#result4').html(currentLen - allLenght);
            }
        };

        var testN = 0;
        for (var i = 0; i < index; i++) {
            testN = Carr[i] + testN;
        }

    } else if (thickness && circleL) {
        jQuery('#needInput').html('卷材总长度');
        toastBtn.click();
    } else if (allLenght && circleL) {
        jQuery('#needInput').html('卷材厚度');
        toastBtn.click();
    }
    else if (allLenght && thickness) {
        jQuery('#needInput').html('圆柱直径');
        toastBtn.click();
    }

    else if (allLenght) {
        jQuery('#needInput').html('卷材厚度');
        toastBtn.click();
    }

    else {
        jQuery('#needInput').html('卷材总长度');
        toastBtn.click();

    }

}

