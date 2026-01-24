<template>
  <div class="carousel">
    <div class="carousel-container">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(item, index) in slides" :key="index" class="carousel-slide">
            <img :src="item.image" :alt="item.title">
            <div class="carousel-caption">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
        </div>
      </div>
      <button class="carousel-btn prev" @click="prevSlide">&lt;</button>
      <button class="carousel-btn next" @click="nextSlide">&gt;</button>
      <div class="carousel-indicators">
        <span v-for="(item, index) in slides" :key="index" 
              :class="{ active: currentIndex === index }"
              @click="goToSlide(index)"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data() {
    return {
      currentIndex: 0,
      slides: [],
      baseUrl: '',
      autoplayInterval: null
    }
  },
  mounted() {
    this.loadConfig().then(() => {
      this.fetchCarouselData()
    })
    this.startAutoplay()
  },
  methods: {
    async loadConfig() {
      try {
        const response = await fetch('/config.json')
        const config = await response.json()
        this.baseUrl = config.LOCAL_HOST
      } catch (error) {
        console.error('加载配置文件失败:', error)
        this.baseUrl = ''
      }
    },
    async fetchCarouselData() {
      try {
        const response = await fetch(`${this.baseUrl}/app/carousel/list`)
        const data = await response.json()
        if (data.code === 200 && data.rows) {
          this.slides = data.rows.filter(item => item.status === "1").map(item => ({
            image: item.imgUrl,
            title: item.title,
            description: item.description
          }))
        }
      } catch (error) {
        console.error('获取轮播图数据失败:', error)
        this.setDefaultSlides()
      }
    },
    setDefaultSlides() {
      this.slides = [
        {
          image: require('@/assets/img/3.png'),
          title: '公司简介',
          description: '了解我们的企业文化和发展历程'
        },
        {
          image: require('@/assets/img/9.png'),
          title: '最新动态',
          description: '关注公司最新发展和行业资讯'
        },
        {
          image: require('@/assets/img/7.png'),
          title: '产品服务',
          description: '探索我们的产品和服务体系'
        },
        {
          image: require('@/assets/img/8.png'),
          title: '联系我们',
          description: '随时为您提供专业服务'
        }
      ]
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length
    },
    goToSlide(index) {
      this.currentIndex = index
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.carousel {
  width: 100%;
  margin-bottom: 15px;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  padding: 40px 30px 20px;
}

.carousel-caption h3 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.carousel-caption p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.carousel-btn.prev {
  left: 20px;
}

.carousel-btn.next {
  right: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.carousel-indicators span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;
}

.carousel-indicators span:hover {
  background: rgba(255, 255, 255, 0.8);
}

.carousel-indicators span.active {
  background: #42a5f5;
  width: 30px;
  border-radius: 6px;
}

@media (max-width: 1200px) {
  .carousel-container {
    height: 450px;
  }
}

@media (max-width: 768px) {
  .carousel-container {
    height: 350px;
  }

  .carousel-caption h3 {
    font-size: 20px;
  }

  .carousel-caption p {
    font-size: 12px;
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .carousel-btn.prev {
    left: 10px;
  }

  .carousel-btn.next {
    right: 10px;
  }
}

@media (max-width: 480px) {
  .carousel-container {
    height: 250px;
  }

  .carousel-caption {
    padding: 20px 15px 10px;
  }

  .carousel-caption h3 {
    font-size: 16px;
  }

  .carousel-caption p {
    font-size: 12px;
  }

  .carousel-btn {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }
}
</style>
