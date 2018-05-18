// @flow
import { observable, action, autorun } from 'mobx';
/**
 * Хранилище всех состояний
 * articles — список новостей
 * filters — используемые фильтры
 * updateArticles — флаг состояния получения списка новостей
 */
class ArticleStore {
  @observable articles = [];
  @observable filters = {};
  @observable updateArticles = false;

  getArticles() {
    return this.articles;
  }

  getFilter() {
    return this.filters;
  }

  @action addArticles(articles) {
    this.articles = articles;
  }

  @action setFilter(arg) {
    this.filters = Object.assign({}, this.filters, arg);
  }

  @action setUpdateState(arg) {
    this.updateArticles = arg;
  }
}

const articleStore = new ArticleStore();

autorun(() => {
  console.log(articleStore.getArticles().toJS());
});

export default articleStore;
export { ArticleStore };
