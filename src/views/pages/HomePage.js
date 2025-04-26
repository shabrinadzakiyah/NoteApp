import StoryModel from '../../models/StoryModel.js';
import StoryView from '../StoryView.js';
import StoryPresenter from '../../presenters/StoryPresenter.js';

const HomePage = {
  async render() {
    return `
      <section id="home" class="page-enter">
        <h2>Daftar Cerita</h2>
        <div id="map" style="height: 400px;"></div>
        <div id="storyContainer"></div>
      </section>
    `;
  },

  async afterRender() {
    const token = localStorage.getItem("token");
  
    const section = document.getElementById('home');
    if (section) {
      requestAnimationFrame(() => {
        section.classList.add('page-enter-active');
      });
  
      setTimeout(() => {
        section.classList.remove('page-enter');
        section.classList.remove('page-enter-active');
      }, 600);
    }
  
    const container = document.getElementById('storyContainer');
    if (!container) {
      console.error('Elemen #storyContainer tidak ditemukan!');
      return;
    }
  
    const model = new StoryModel('https://story-api.dicoding.dev/v1');
    const view = new StoryView(container, 'map');
    const presenter = new StoryPresenter(model, view, token);
  
    await presenter.loadStories();
  }
  
};

export default HomePage;
