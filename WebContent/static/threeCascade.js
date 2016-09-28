;(function($){
	
	function ThreeCascade(){}
	
	/**
	 * 工具类
	 */
	function createTools(){}
	
	//生成省列表
	createTools.prototype.createProv=function(p){
		 $.each(p,function () {
	            var $opt=$("<option id="+this.ProID+">"+this.name+"</option>");
	            $opt.appendTo($("#province"));
	     });
	};
	//生成市列表
	createTools.prototype.createCity=function(c,a){
		$("#province").change(function () {
            $("#city").empty();
            $("#area").empty();
            var pId=$(this).find("option:selected").attr("id");
            $.each(c,function () {
                if(pId==this.ProID){
                    var $opt=$("<option id="+this.CityID+">"+this.name+"</option>");
                    $opt.appendTo($("#city"));
                }

            });

            var cId=$("#city").find("option:selected").attr("id");
            areaHandler(a,cId);
        });
	};
	//生成区列表
	createTools.prototype.createArea=function(a){
		$("#city").change(function () {
            $("#area").empty();
            var cId=$(this).find("option:selected").attr("id");
            areaHandler(a,cId);
        });
		
	};
	
	ThreeCascade.prototype.createTools=new createTools();
	
	function areaHandler(a,cId){
		$.each(a,function () {
            if(cId==this.CityID){
                var $opt=$("<option id="+this.Id+">"+this.DisName+"</option>");
                $opt.appendTo($("#area"));
            }
        });
	}
	
	//初始化三级联动菜单
	ThreeCascade.prototype.init=function(_selector){
		var p=province,c=city,a=area;

		this.createTools.createProv(p);
		this.createTools.createCity(c,a);
		this.createTools.createArea(a);

	};
	
	var ThreeCascade=new ThreeCascade();
	
	$.fn.extend({
		//初始化省、市、县联动
		createCascade:function(){
			var _selector=$(this).selector;
			
			var $container=$('<select id="province"></select>'+
							'<select id="city"></select>'+
							'<select id="area"></select>');
			
			$(this).append($container);
			
			ThreeCascade.init(_selector);
			
		}
	})
})(jQuery)