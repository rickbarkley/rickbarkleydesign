(function($) {

    //plugin definition
    $.fn.bloxhover = function(options) {

        //Merge our default settings with custom ones
        var settings = $.extend({}, $.fn.bloxhover.defaults, options);

        //check if easing library is included
        if ($.easing && $.easing.easeInOutQuad) {
            var easingExists = true;
        } else {
            var easingExists = false;
        }

        //square effect function
        var square = function(wrapperDiv, image, content) {

            var surface = image.height() * image.width() / settings.sliceCount;
            var side = Math.ceil(Math.sqrt(surface));
            //var width = Math.ceil(100 / settings.sliceCount);
            //var height = image.height();
            var i = 0;
            var iMax = Math.ceil(image.width() / side);
            var j = 0;
            var jMax = Math.ceil(image.height() / side);
            var total = iMax * jMax;
            var ar = [];

            for (var cnt = 0; cnt < total; cnt++) {
                ar[cnt] = cnt;
            }

            ar.sort(function() {
                return Math.random() - 0.5;
            });


            //create each slice
            while (j < jMax) {
                while (i < iMax) {
                    var leftPosition = i * side;
                    var topPosition = j * side;

                    $('<div/>', {
                        class: 'bloxhoverSlice',
                        style: 'position: absolute; z-index: 2; display: none; top: ' + topPosition + 'px; height: ' + side + 'px; width: ' + side + 'px; left: ' + leftPosition + 'px; background: ' + settings.color + ';'
                    }).appendTo(wrapperDiv);
                    //console.log(i + ' ' + j);
                    i++;
                }
                i = 0;
                j++;
            }

            //set hover effect 
            var t;
            wrapperDiv.hover(
                    function() {

                        var allSlices = $('.bloxhoverSlice', this);
                        var padre = $(this);
                        allSlices.stop().fadeOut(0);


                        allSlices.each(function(index) {
                            
                            var self = $('.bloxhoverSlice', padre).eq(ar[index]);
                            
                            t = setTimeout(function() {
                                
                                if (easingExists && t)
                                    self.fadeIn(settings.duration, 'easeInOutCubic');
                                else if (t)
                                    self.fadeIn(settings.duration);
                            }, index * settings.delay);
                            
                        });


                        var halfTime = settings.duration  + ((settings.sliceCount-1) * settings.delay) / 2;
                        content.stop().fadeIn(halfTime);

                    },
                    function() {
                        
                         clearTimeout(t);
                         t = null;
                         $('.bloxhoverSlice', this).stop().fadeOut(settings.duration);
                         content.stop().fadeOut(settings.duration);
                         
                    });

        };

        //square reveal effect function
        var squareReveal = function(wrapperDiv, image) {

            var surface = image.height() * image.width() / settings.sliceCount;
            var side = Math.ceil(Math.sqrt(surface));
            //var width = Math.ceil(100 / settings.sliceCount);
            //var height = image.height();
            var i = 0;
            var iMax = Math.ceil(image.width() / side);
            var j = 0;
            var jMax = Math.ceil(image.height() / side);
            var total = iMax * jMax;
            var ar = [];

            for (var cnt = 0; cnt < total; cnt++) {
                ar[cnt] = cnt;
            }

            ar.sort(function() {
                return Math.random() - 0.5;
            });


            //create each slice
            while (j < jMax) {
                while (i < iMax) {
                    var leftPosition = i * side;
                    var topPosition = j * side;

                    $('<div/>', {
                        class: 'bloxhoverSlice',
                        style: 'position: absolute; z-index: 2; top: ' + topPosition + 'px; height: ' + side + 'px; width: ' + side + 'px; left: ' + leftPosition + 'px; background: ' + settings.color + ';'
                    }).appendTo(wrapperDiv);
                    //console.log(i + ' ' + j);
                    i++;
                }
                i = 0;
                j++;
            }

            //set hover effect 
            var t;
            wrapperDiv.hover(
                    function() {

                        var allSlices = $('.bloxhoverSlice', this);
                        var padre = $(this);
                        allSlices.stop().fadeIn(0);


                        allSlices.each(function(index) {
                            
                            var self = $('.bloxhoverSlice', padre).eq(ar[index]);
                            
                            t = setTimeout(function() {
                                
                                if (easingExists && t)
                                    self.fadeOut(settings.duration, 'easeInOutCubic');
                                else if (t)
                                    self.fadeOut(settings.duration);
                            }, index * settings.delay);
                            
                        });


                        

                    },
                    function() {
                        
                         clearTimeout(t);
                         t = null;
                         $('.bloxhoverSlice', this).stop().fadeIn(settings.duration);
                         
                    });

        };

        //vertical effect function
        var vertical = function(wrapperDiv, image, content) {

            var width = Math.ceil(100 / settings.sliceCount);
            var height = image.height();
            var i = 0;

            //create each slice
            while (i < settings.sliceCount) {
                var leftPosition = i * width;

                $('<div/>', {
                    class: 'bloxhoverSlice',
                    style: 'position: absolute; z-index: 2; top: -' + height + 'px; height: ' + height + 'px; width: ' + width + '%; left: ' + leftPosition + '%; background: ' + settings.color + ';'
                }).appendTo(wrapperDiv);

                i++;
            }

            //set hover effect 
            var t;
            wrapperDiv.hover(
                    function() {

                        var allSlices = $('.bloxhoverSlice', this);
                        allSlices.stop().css({'top': '-' + height + 'px'}).fadeIn(0);

                        allSlices.each(function(index) {

                            var self = $(this);

                            t = setTimeout(function() {
                                if (easingExists && t)
                                    self.animate({top: '0'}, settings.duration, 'easeInOutCubic');
                                else if (t)
                                    self.animate({top: '0'}, settings.duration);
                            }, index * settings.delay);

                        });

                        var halfTime = settings.duration  + ((settings.sliceCount-1) * settings.delay) / 2;
                        content.stop().fadeIn(halfTime);

                    },
                    function() {

                        clearTimeout(t);
                        t = null;
                        $('.bloxhoverSlice', this).stop().fadeOut(settings.duration);
                        content.stop().fadeOut(settings.duration);

                    });

        };

        // vertical reveal function
        var verticalReveal = function(wrapperDiv, image) {

            var width = Math.ceil(100 / settings.sliceCount);
            var height = image.height();
            var i = 0;

            //create each slice
            while (i < settings.sliceCount) {
                var leftPosition = i * width;

                $('<div/>', {
                    class: 'bloxhoverSlice',
                    style: 'position: absolute; z-index: 2; top: 0px; height: ' + height + 'px; width: ' + width + '%; left: ' + leftPosition + '%; background: ' + settings.color + ';'
                }).appendTo(wrapperDiv);

                i++;
            }

            //set hover effect 
            var t;
            wrapperDiv.hover(
                    function() {

                        var allSlices = $('.bloxhoverSlice', this);
                        allSlices.stop().css({'top': '0px'}).fadeIn(0);
                        var pjasd = 0;
                        allSlices.each(function(index) {

                            var self = $(this);

                            t = setTimeout(function() {
                                console.log(pjasd);
                                pjasd++;
                                if (easingExists && t)
                                    self.animate({top: '-' + height + 'px'}, settings.duration, 'easeInOutCubic');
                                else if (t)
                                    self.animate({top: '-' + height + 'px'}, settings.duration);
                            }, index * settings.delay);

                        });




                    },
                    function() {

                        clearTimeout(t);
                        t = null;
                        $('.bloxhoverSlice', this).dequeue().stop().css({'top': '0px'}).fadeIn(0);


                    });

        };

        //vertical alternate effect function
        var verticalAlternate = function(wrapperDiv, image, content) {

            var width = Math.ceil(100 / settings.sliceCount);
            var height = image.height();
            var i = 0;

            //create each slice
            while (i < settings.sliceCount) {
                var leftPosition = i * width;

                if (i % 2 === 0) {
                    $('<div/>', {
                        class: 'bloxhoverSlice bloxhoverSliceTop',
                        style: 'position: absolute; z-index: 2; top: -' + height + 'px; height: ' + height + 'px; width: ' + width + '%; left: ' + leftPosition + '%; background: ' + settings.color + ';'
                    }).appendTo(wrapperDiv);
                } else {
                    $('<div/>', {
                        class: 'bloxhoverSlice bloxhoverSliceBot',
                        style: 'position: absolute; z-index: 2; top:' + height + 'px; height: ' + height + 'px; width: ' + width + '%; left: ' + leftPosition + '%; background: ' + settings.color + ';'
                    }).appendTo(wrapperDiv);
                }
                i++;
            }

            //set hover effect 
            var t;
            wrapperDiv.hover(
                    function() {

                        var allSlices = $('.bloxhoverSlice', this);
                        $('.bloxhoverSliceTop', this).stop().css({'top': '-' + height + 'px'}).fadeIn(0);
                        $('.bloxhoverSliceBot', this).stop().css({'top': height + 'px'}).fadeIn(0);

                        allSlices.each(function(index) {

                            var self = $(this);

                            t = setTimeout(function() {
                                if (easingExists && t)
                                    self.animate({top: '0'}, settings.duration, 'easeInOutCubic');
                                else if (t)
                                    self.animate({top: '0'}, settings.duration);
                            }, index * settings.delay);

                        });

                        var halfTime = settings.duration  + ((settings.sliceCount-1) * settings.delay) / 2;
                        content.stop().fadeIn(halfTime);

                    },
                    function() {

                        clearTimeout(t);
                        t = null;
                        $('.bloxhoverSlice', this).stop().fadeOut(settings.duration);
                        content.stop().fadeOut(settings.duration);

                    });

        };


        //vertical alternate reveal effect function
        var verticalAlternateReveal = function(wrapperDiv, image) {

            var width = Math.ceil(100 / settings.sliceCount);
            var height = image.height();
            var i = 0;

            //create each slice
            while (i < settings.sliceCount) {
                var leftPosition = i * width;

                if (i % 2 === 0) {
                    $('<div/>', {
                        class: 'bloxhoverSlice bloxhoverSliceTop',
                        style: 'position: absolute; z-index: 2; top: 0px; height: ' + height + 'px; width: ' + width + '%; left: ' + leftPosition + '%; background: ' + settings.color + ';'
                    }).appendTo(wrapperDiv);
                } else {
                    $('<div/>', {
                        class: 'bloxhoverSlice bloxhoverSliceBot',
                        style: 'position: absolute; z-index: 2; top: 0px; height: ' + height + 'px; width: ' + width + '%; left: ' + leftPosition + '%; background: ' + settings.color + ';'
                    }).appendTo(wrapperDiv);
                }
                i++;
            }

            //set hover effect 
            var t;
            wrapperDiv.hover(
                    function() {

                        var allSlices = $('.bloxhoverSlice', this);
                        allSlices.stop().css({top: '0'});
                        allSlices.each(function(index) {

                            var self = $(this);

                            t = setTimeout(function() {
                                if (easingExists && t) {
                                    if (index % 2 === 0)
                                        self.animate({'top': '-' + height + 'px'}, settings.duration, 'easeInOutCubic');
                                    else
                                        self.animate({'top': height + 'px'}, settings.duration, 'easeInOutCubic');

                                }
                                else if (t) {
                                    if (index % 2 === 0)
                                        self.animate({'top': '-' + height + 'px'}, settings.duration);
                                    else
                                        self.animate({'top': height + 'px'}, settings.duration);
                                }
                            }, index * settings.delay);

                        });



                    },
                    function() {

                        clearTimeout(t);
                        t = null;
                        $('.bloxhoverSlice', this).stop().css({top: '0'});

                    });

        };
        //horizontal effect function
        var horizontal = function(wrapperDiv, image, content) {

            var width = image.width();
            var height = Math.ceil(100 / settings.sliceCount);
            var i = 0;

            //create each slice
            while (i < settings.sliceCount) {
                var topPosition = i * height;

                $('<div/>', {
                    class: 'bloxhoverSlice',
                    style: 'position: absolute; z-index: 2; top: ' + topPosition + '%; height: ' + height + '%; width: ' + width + 'px; left: -' + width + 'px; background: ' + settings.color + ';'
                }).appendTo(wrapperDiv);

                i++;
            }

            //set hover effect 
            var t;
            wrapperDiv.hover(
                    function() {

                        var allSlices = $('.bloxhoverSlice', this);
                        allSlices.stop().css({'left': '-' + width + 'px'}).fadeIn(0);

                        allSlices.each(function(index) {

                            var self = $(this);

                            t = setTimeout(function() {
                                if (easingExists && t)
                                    self.animate({left: '0'}, settings.duration, 'easeInOutCubic');
                                else if (t)
                                    self.animate({left: '0'}, settings.duration);
                            }, index * settings.delay);

                        });

                        var halfTime = settings.duration  + ((settings.sliceCount-1) * settings.delay) / 2;
                        content.stop().fadeIn(halfTime);

                    },
                    function() {

                        clearTimeout(t);
                        t = null;
                        $('.bloxhoverSlice', this).stop().fadeOut(settings.duration);
                        content.stop().fadeOut(settings.duration);

                    });

        };

        //horizontal reveal function
        var horizontalReveal = function(wrapperDiv, image) {

            var width = image.width();
            var height = Math.ceil(100 / settings.sliceCount);
            var i = 0;

            //create each slice
            while (i < settings.sliceCount) {
                var topPosition = i * height;

                $('<div/>', {
                    class: 'bloxhoverSlice',
                    style: 'position: absolute; z-index: 2; top: ' + topPosition + '%; height: ' + height + '%; width: ' + width + 'px; left: 0px; background: ' + settings.color + ';'
                }).appendTo(wrapperDiv);

                i++;
            }

            //set hover effect 
            var t;
            wrapperDiv.hover(
                    function() {

                        var allSlices = $('.bloxhoverSlice', this);
                        allSlices.stop().css({'left': '0px'});

                        allSlices.each(function(index) {

                            var self = $(this);

                            t = setTimeout(function() {
                                if (easingExists && t)
                                    self.animate({left: '-' + width + 'px'}, settings.duration, 'easeInOutCubic');
                                else if (t)
                                    self.animate({left: '-' + width + 'px'}, settings.duration);
                            }, index * settings.delay);

                        });




                    },
                    function() {

                        clearTimeout(t);
                        t = null;
                        $('.bloxhoverSlice', this).stop().css({'left': '0px'});


                    });

        };

        //horizontal alternate effect function
        var horizontalAlternate = function(wrapperDiv, image, content) {

            var width = image.width();
            var height = Math.ceil(100 / settings.sliceCount);
            var i = 0;

            //create each slice
            while (i < settings.sliceCount) {
                var topPosition = i * height;

                if (i % 2 === 0) {
                    $('<div/>', {
                        class: 'bloxhoverSlice bloxhoverLeftSlice',
                        style: 'position: absolute; z-index: 2; top: ' + topPosition + '%; height: ' + height + '%; width: ' + width + 'px; left: -' + width + 'px; background: ' + settings.color + ';'
                    }).appendTo(wrapperDiv);
                }
                else {
                    $('<div/>', {
                        class: 'bloxhoverSlice bloxhoverRightSlice',
                        style: 'position: absolute; z-index: 2; top: ' + topPosition + '%; height: ' + height + '%; width: ' + width + 'px; left: ' + width + 'px; background: ' + settings.color + ';'
                    }).appendTo(wrapperDiv);
                }
                i++;
            }

            //set hover effect 
            var t;
            wrapperDiv.hover(
                    function() {

                        var allSlices = $('.bloxhoverSlice', this);
                        $('.bloxhoverLeftSlice', this).css({'left': '-' + width + 'px'}).fadeIn(0);
                        $('.bloxhoverRightSlice', this).css({'left': (width) + 'px'}).fadeIn(0);

                        allSlices.each(function(index) {

                            var self = $(this);

                            t = setTimeout(function() {
                                if (easingExists && t)
                                    self.animate({left: '0'}, settings.duration, 'easeInOutCubic');
                                else if (t)
                                    self.animate({left: '0'}, settings.duration);
                            }, index * settings.delay);

                        });

                        var halfTime = settings.duration  + ((settings.sliceCount-1) * settings.delay) / 2;
                        content.stop().fadeIn(halfTime);

                    },
                    function() {

                        clearTimeout(t);
                        t = null;
                        $('.bloxhoverSlice', this).stop().fadeOut(settings.duration);
                        content.stop().fadeOut(settings.duration);

                    });

        };

        //horizontal alternate reveal effect function
        var horizontalAlternateReveal = function(wrapperDiv, image) {

            var width = image.width();
            var height = Math.ceil(100 / settings.sliceCount);
            var i = 0;

            //create each slice
            while (i < settings.sliceCount) {
                var topPosition = i * height;

                if (i % 2 === 0) {
                    $('<div/>', {
                        class: 'bloxhoverSlice bloxhoverLeftSlice',
                        style: 'position: absolute; z-index: 2; top: ' + topPosition + '%; height: ' + height + '%; width: ' + width + 'px; left: 0px; background: ' + settings.color + ';'
                    }).appendTo(wrapperDiv);
                }
                else {
                    $('<div/>', {
                        class: 'bloxhoverSlice bloxhoverRightSlice',
                        style: 'position: absolute; z-index: 2; top: ' + topPosition + '%; height: ' + height + '%; width: ' + width + 'px; left: 0px; background: ' + settings.color + ';'
                    }).appendTo(wrapperDiv);
                }
                i++;
            }

            //set hover effect 
            var t;
            wrapperDiv.hover(
                    function() {

                        var allSlices = $('.bloxhoverSlice', this);

                        allSlices.stop().css({'left': '0px'});

                        allSlices.each(function(index) {

                            var self = $(this);

                            t = setTimeout(function() {
                                if (easingExists && t) {
                                    if (index % 2 === 0)
                                        self.animate({left: '-' + width + 'px'}, settings.duration, 'easeInOutCubic');
                                    else
                                        self.animate({left: width + 'px'}, settings.duration, 'easeInOutCubic');
                                }
                                else if (t) {
                                    if (index % 2 === 0)
                                        self.animate({left: '-' + width + 'px'}, settings.duration);
                                    else
                                        self.animate({left: width + 'px'}, settings.duration);
                                }
                            }, index * settings.delay);

                        });



                    },
                    function() {

                        clearTimeout(t);
                        t = null;
                        $('.bloxhoverSlice', this).stop().css({'left': '0px'});
                        ;


                    });

        };


        //bloxhover main code
        return this.each(function() {
            var wrap = $(this);
            var img = wrap.children('img:eq(0)');
            var cont = wrap.children('div:eq(0)');

            //wait for our image to be loaded and then do the calculations;
            img.load(function() {

                var imgWidth = img.width();
                var imgHeight = img.height();
                var contPosX = (imgWidth / 2) - (cont.width() / 2);
                var contPosY = (imgHeight / 2) - (cont.height() / 2);

                //set css settings required for effect to work
                img.css({'position': 'absolute', 'top': '0', 'left': '0', 'z-index': '1'});
                cont.css({'position': 'absolute', 'top': contPosY + 'px', 'left': '0px', 'right' : '0', 'text-align': 'center', 'z-index': '3', 'display': 'none'});
                wrap.css({'position': 'relative', 'display': 'inline-block', 'overflow': 'hidden', 'width': imgWidth + 'px', 'height': imgHeight + 'px'});


                switch (settings.effect)
                {
                    case 'square':
                        square(wrap, img, cont);
                        break;
                    case 'square reveal':
                        squareReveal(wrap, img);
                        break;
                    case 'vertical':
                        vertical(wrap, img, cont);
                        break;
                    case 'vertical reveal':
                        verticalReveal(wrap, img);
                        break;
                    case 'vertical alternate':
                        verticalAlternate(wrap, img, cont);
                        break;
                    case 'vertical alternate reveal':
                        verticalAlternateReveal(wrap, img);
                        break;
                    case 'horizontal':
                        horizontal(wrap, img, cont);
                        break;
                    case 'horizontal reveal':
                        horizontalReveal(wrap, img);
                        break;
                    case 'horizontal alternate':
                        horizontalAlternate(wrap, img, cont);
                        break;
                    case 'horizontal alternate reveal':
                        horizontalAlternateReveal(wrap, img);
                        break;
                    default:
                        vertical(wrap, img, cont);

                }

            });
        });

    };

    //public defaults
    $.fn.bloxhover.defaults = {
        effect: "vertical", // accepted strings: 'square', 'square reveal', 'vertical', 'vertical reveal', 'vertical alternate', 'vertical alternate reveal', 'horizontal', 'horizontal reveal', 'horizontal alternate', 'horizontal alternate reveal'
        sliceCount: 8, // the number of slices 
        color: 'rgba(0, 0, 0, 0.5)', //rgba color of the slices
        duration: 300, //how long should the animation of each slice last
        delay: 100 // delay between slice animations
    };

}(jQuery));