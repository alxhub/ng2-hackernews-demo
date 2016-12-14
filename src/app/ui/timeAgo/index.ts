import {Pipe} from '@angular/core'

@Pipe({
  name: 'timeAgo',
  pure: true
})
export class TimeAgo {
  transform(time: number): string {
    const between = performance.now() / 1000 - Number(time);
    if (between < 3600) {
      return pluralize(~~(between / 60), ' minute');
    } else if (between < 86400) {
      return pluralize(~~(between / 3600), ' hour');
    } else {
      return pluralize(~~(between / 86400), ' day');
    }
  }
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
}
