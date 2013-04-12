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
    id="aula-trainning"
    class=""
    data-courseid="{{course.courseId}}"
    data-isinstructor="{{course.isInstructor}}"
    data-courseurl="{{course.courseUrl}}"
    data-coursetitle="{{course.courseTitle}}"
    data-userid="{{course.userId}}"
    data-uimessages="{{course.uiMessages}}"
    data-autoplay="{{course.autoplay}}">

    <div class="view">

        <a href="" class="go-back" ng-click="back(1)">Back to Course</a>

        <ul id="timeline" style="top: -{{screenOnFront}}%;" ng-cloak>

            <li class="chapter">
                <!--                <span class="percent chapter-number"><span>Section</span>1</span>-->
                <span class="element"><span>Section</span>1</span>
                <div class="intro"><span><b>{{course.intro.message}}</b></span></div>
                <div class="bottom"><a href="" class="next continue" ng-click="continue(1)">Continue</a></div>
            </li>

            <li class="on" ng-repeat="activity in activities">

                <div class="prev-lecture" ng-click="back(activity.number)"><span>Previous Lecture</span></div>

                <div class="top">
                    <span>SECTION {{activity.t}}</span>
                    <span>LECTURE</span>
                    <span>{{activity.number}}</span>
                    <h1>{{activity.title}}</h1>
                </div>

                <div class="activity-container">
                    <aula-activity id="activity.id" type="activity.type" params="activity.params"></aula-activity>
                </div>

                <div class="bottom">
                    <a class="next" href="" ng-click="next(activity.number)">NEXT ACTIVITY</a>

                    <div class="share mini-tooltip">
                        share
                        <div class="tooltip-content">
                            <a class="f" href="http://www.facebook.com/sharer.php?t=">facebook</a>
                            <a class="t" href="https://twitter.com/intent/tweet?text=">twitter</a>
                        </div>
                    </div>

                    <a href="" class="mark mini-tooltip read"><span class="tooltip-content"><b>Mark as Completed</b><b>Mark as Uncompleted</b></span></a>
                </div>
            </li>

            <li class="certificate">
                <div class="badge"><span class="icon"></span></div>
                <div class="congrats">
                    <h2>Congratulations!</h2>
                    <p>You just completed the course<br>"<b>{{course.courseTitle}}</b>"!<br></p>

                    <div class="share">
                        <h4>Share the good news:</h4>
                        <div class="btns">
                            <a class="fb" target="_blank" href="http://www.facebook.com/sharer.php?t=eee&u=https://www.apiumtech.com">Facebook</a>
                            <a class="tw" target="_blank" href="http://twitter.com/intent/tweet?text=eee&url=https://www.apiumtech.com">Twitter</a>
                        </div>
                    </div>
                </div>
            </li>

        </ul>


    </div>

    <div class="sidebar">
        <a class="close-btn" href="" ng-click="switchSidebar();"></a>
        <div class="tab-container">
            <tabs>
                <pane heading="NO SE QUE">
                    <div>está demostrado que eres una pinki</div>
                </pane>
                <pane heading="PONER POR"></pane>
                <pane heading="CULPA'LAURA"></pane>
            </tabs>
        </div>
    </div>
</div>