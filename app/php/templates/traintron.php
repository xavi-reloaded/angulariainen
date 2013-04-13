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

        <ul id="timeline" style="top: -{{screenOnFront}}%;" ng-cloak>

            <li class="chapter">
                <div class="hero-unit">
                    <h1>Hello, wowAula Trainning!</h1>
                    <p>{{course.intro.message}}</p>
                    <p class="btn btn-primary btn-large" ng-click="continue(1)"><br/>Begin course<br/><br/></p>
                </div>

            </li>

            <li class="on" ng-repeat="activity in activities">

                <div class="btn-group dropdown">
                    <button class="btn dropdown-toggle btn-mini btn-success"  data-toggle="dropdown"><i class="icon-arrow-up icon-white"></i></button>
                    <ul class="dropdown-menu">
                        <li><a href="#" ng-click="back(1)">Back to first</a></li>
                        <li><a href="#" ng-click="back(activity.number)">Previous Activity</a></li>
                    </ul>
                    <button class="btn btn-mini btn-success" ng-click="back(activity.number)">PREVIOUS ACTIVITY</button>
                </div><!-- /btn-group -->


                <div class="top">
                    <div class="btn-group">
                        <button class="btn btn-info">SECTION {{activity.t}}</button>
                        <button class="btn btn-info">LECTURE {{activity.number}}</button>
                        <button class="btn btn-inverse">{{activity.title}}</button>
                    </div>
                </div>

                <div class="activity-container">
                    <aula-activity id="activity.id" type="activity.type" params="activity.params"></aula-activity>
                </div>

                <div class="bottom">

                    <button class="btn btn-mini btn-success" ng-click="next(activity.number)"><i class="icon-arrow-down icon-white"></i>NEXT ACTIVITY</button>

                    <div class="btn-group dropup">
                        <button class="btn btn-mini btn-success" ng-show="activity.completed" ng-click="markAsCompleted(activity.id)">Completed<i class="icon-star icon-white"></i></button>
                        <button class="btn btn-mini btn-danger" ng-hide="activity.completed" ng-click="markAsCompleted(activity.id)">Pending<i class="icon-star-empty icon-white"></i></button>
                        <button class="btn dropdown-toggle btn-mini btn-success" data-toggle="dropdown">Share<i class="icon-share-alt icon-white"></i></button>
                        <ul class="dropdown-menu">
                            <li><a target="_blank" href="http://www.facebook.com/sharer.php?t">Facebook</a></li>
                            <li><a target="_blank" href="http://twitter.com/intent/tweet?text=">Twitter</a></li>
                        </ul>
                    </div>
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
        <button class="close-btn btn btn-mini btn-inverse" ng-click="switchSidebar();">
            <i class="icon-fast-forward icon-white"></i>
        </button>
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