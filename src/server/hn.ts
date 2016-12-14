import * as firebase from 'firebase';
import {Api, Item, Story, ExStory, Comment, ExComment} from '../app/util/api';

const PAGE_SIZE = 25;

export class HnFirebase {
  db: firebase.database.Reference;

  constructor() {
    this.db = firebase
      .initializeApp({databaseURL: 'https://hacker-news.firebaseio.com/'})
      .database()
      .ref('/v0');
  }

  storyPage(path: string, page: number): Promise<Story[]> {
    return this
      .json<number[]>(path)
      .then(stories => pageFn(stories, page))
      .then<Story[]>(ids => this.stories(ids));
  }

  story(id: number): Promise<Story> {
    return this.json<Story>(`item/${id}`);
  }

  exStory(id: number, level: number): Promise<ExStory> {
    return this
      .story(id)
      .then(story => story && story.kids ? Promise
        .all(story.kids.map(subId => this.exComment(subId, level)))
        .then(children => {
          const extended = story as ExStory;
          extended.comments = children;
          return extended;
        })
      : story as ExStory);
  }

  exComment(id: number, level: number): Promise<ExComment> {
    const basic = this.json<Comment>(`item/${id}`);
    if (level === 0) {
      return basic;
    }
    return basic
      .then(comment => comment && comment.kids ? Promise
        .all(comment.kids.map(subId => this.exComment(subId, level - 1)))
        .then(children => {
          const extended = comment as ExComment;
          extended.children = children;
          return extended;
        })
      : comment as ExComment);
  }

  private json<T>(path: string): Promise<T> {
    return this
      .db
      .child(path)
      .once('value')
      .then((data: firebase.database.DataSnapshot) => data.val()) as Promise<T>
  }

  private stories(ids: number[]): Promise<Story[]> {
    return Promise.all(ids.map(id => this.story(id)));
  }
}

function pageFn(stories: number[], page: number): number[] {
  return stories.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
}

export const hn = new HnFirebase();
