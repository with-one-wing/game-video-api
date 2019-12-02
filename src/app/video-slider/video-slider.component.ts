import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CommonService} from '../services/common.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-video-slider',
  templateUrl: './video-slider.component.html',
  styleUrls: ['./video-slider.component.scss']
})
export class VideoSliderComponent implements OnInit {

  playlist: Array<any> = [];

  private currentIndex = 0;

  @ViewChildren('media') videos: QueryList<ElementRef>;

  constructor(
    private gameService: CommonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const {month, gameId} = this.route.snapshot.params;
    this.gameService.getVideos(gameId, month).forEach(async (videoPromise, index) => {
      const videoIndex = ('' + (++index)).padStart(2, '0');
      try {
        await videoPromise;
        this.playlist.push(`${environment.videoUrl}${gameId}/${month}/${videoIndex}.${environment.videoExt}`);
      } catch (e) {
          console.log(`Not found videos ${videoIndex + 1}`);
      }
    });
  }

  onSlideChange(index) {
    const videos = this.videos.toArray();
    if (videos[this.currentIndex]) {
      const currentVideo: HTMLMediaElement = videos[this.currentIndex].nativeElement;
      currentVideo.pause();
      this.currentIndex = index;
    }
  }
}
