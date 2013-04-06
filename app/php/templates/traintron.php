<?php
/**
 * Created by JetBrains PhpStorm.
 * User: xavi
 * Date: 4/5/13
 * Time: 10:25 PM
 * To change this template use File | Settings | File Templates.
 */
?>

<div
    id="course-taking-page"
    class="ud-coursetaking wrapper"
    data-courseid="{{course.courseId}}"
    data-isinstructor="{{course.isInstructor}}"
    data-courseurl="{{course.courseUrl}}"
    data-coursetitle="{{course.courseTitle}}"
    data-userid="{{course.userId}}"
    data-uimessages="{{course.uiMessages}}"
    data-autoplay="{{course.autoplay}}">

    <div class="main">
        <a id="go-back" href="#dashboard">Back to Course</a>

        <ul id="timeline" style="top: -{{screenOnFront}}%;" ng-cloak>

            <li class="chapter">
                <span class="percent chapter-number"><span>Section</span>1</span>
                <div class="note"><span><b>{{course.intro.message}}</b></span></div>
                <div class="bottom"><a href="" class="continue" ng-click="continue(1)">Continue</a></div>
            </li>

            <li class="on" data-lectureid="213440" ng-repeat="activity in activities">
                <div class="prev-lecture" ng-click="continue(-1)"><a href=""></a><span>Previous Lecture</span></div>
                <div class="top">
                    <span class="ch">SECTION {{activity.t}}</span> <span class="le">LECTURE</span> <span class="no">{{activity.number}}</span>
                    <h1>{{activity.title}}</h1>
                </div>
                <div class="asset-container">
                    <div class="ud-lecture" data-lectureid="213440" data-autoload="false"></div>
                </div>

                <div class="bottom">
                    <a class="autoplay on" data-name="lectureAutoStart">Auto Play<span>ON</span></a>
                    <a class="next-lecture" href="" ng-click="continue(2)">NEXT LECTURE</a>
                    <div class="share mini-tooltip">
                        share
                        <div class="tooltip-content">
                            <a class="f" href="http://www.facebook.com/sharer.php?t=What%20is%20a%20Udemy%20Course?&u=https://www.apiumtech.com/lectures/what-is-a-udemy-course-213440" data-h="370" data-w="640">facebook</a>
                            <a class="t" href="https://twitter.com/intent/tweet?text=What%20is%20a%20Udemy%20Course?&url=https://www.apiumtech.com/lectures/what-is-a-udemy-course-213440&via=udemy">twitter</a>
                        </div>
                    </div>
                    <a href="" class="mark mini-tooltip read"><span class="tooltip-content"><b>Mark as Completed</b><b>Mark as Uncompleted</b></span></a>
                </div>
            </li>



        </ul>


    </div>
</div>