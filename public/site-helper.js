// public/site-helper.js

(function() {
  'use strict';

  // 配置数据
  var config = {
    siteUrl: 'https://cnofficial-leyu.com.cn',
    keyword: '乐鱼体育',
    cardTitle: '欢迎访问我们的平台',
    cardMessage: '本页面提供快速导航与使用指引。',
    badgeColor: '#ff6600',
    badgeTextColor: '#ffffff'
  };

  // 预定义的提示卡片集合
  var tips = [
    { title: '新手指南', content: '注册后即可体验完整的体育赛事服务。' },
    { title: '安全提醒', content: '建议使用强密码并定期更换。' },
    { title: '客服支持', content: '遇到问题可联系在线客服获取帮助。' }
  ];

  // 关键词徽章列表（模拟标签）
  var badges = [
    { label: '体育赛事', active: true },
    { label: '实时比分', active: false },
    { label: '数据分析', active: true },
    { label: '乐鱼体育', active: true },
    { label: '会员福利', active: false },
    { label: '优惠活动', active: true }
  ];

  // 访问说明列表
  var accessNotes = [
    '本平台仅限合法用户访问。',
    '请遵守当地法律法规使用服务。',
    '未成年人请在监护人指导下使用。',
    '每次登录前请确认网址是否正确。'
  ];

  // 工具函数：创建带样式的 DOM 元素
  function createElement(tag, props, children) {
    var el = document.createElement(tag);
    if (props) {
      for (var key in props) {
        if (key === 'style' && typeof props[key] === 'object') {
          for (var cssProp in props[key]) {
            el.style[cssProp] = props[key][cssProp];
          }
        } else {
          el.setAttribute(key, props[key]);
        }
      }
    }
    if (children) {
      if (typeof children === 'string') {
        el.appendChild(document.createTextNode(children));
      } else if (Array.isArray(children)) {
        children.forEach(function(child) {
          if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child));
          } else if (child instanceof HTMLElement) {
            el.appendChild(child);
          }
        });
      }
    }
    return el;
  }

  // 生成提示卡片区域
  function renderTipCards(container) {
    var sectionTitle = createElement('h3', { style: { marginBottom: '10px', color: '#333' } }, '提示卡片');
    container.appendChild(sectionTitle);

    var cardContainer = createElement('div', { style: { display: 'flex', gap: '15px', flexWrap: 'wrap' } });
    tips.forEach(function(tip) {
      var card = createElement('div', {
        style: {
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          backgroundColor: '#f9f9f9',
          width: '200px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      });
      var cardTitle = createElement('h4', { style: { margin: '0 0 8px 0', color: '#007bff' } }, tip.title);
      var cardContent = createElement('p', { style: { margin: 0, fontSize: '14px', color: '#555' } }, tip.content);
      card.appendChild(cardTitle);
      card.appendChild(cardContent);
      cardContainer.appendChild(card);
    });
    container.appendChild(cardContainer);
  }

  // 生成关键词徽章区域
  function renderBadges(container) {
    var sectionTitle = createElement('h3', { style: { marginTop: '20px', marginBottom: '10px', color: '#333' } }, '关键词徽章');
    container.appendChild(sectionTitle);

    var badgeContainer = createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } });
    badges.forEach(function(badge) {
      var bgColor = badge.active ? config.badgeColor : '#cccccc';
      var textColor = badge.active ? config.badgeTextColor : '#666666';
      var badgeEl = createElement('span', {
        style: {
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '20px',
          backgroundColor: bgColor,
          color: textColor,
          fontSize: '13px',
          fontWeight: 'bold',
          border: '1px solid transparent'
        }
      }, badge.label);
      badgeContainer.appendChild(badgeEl);
    });
    container.appendChild(badgeContainer);
  }

  // 生成访问说明区域
  function renderAccessNotes(container) {
    var sectionTitle = createElement('h3', { style: { marginTop: '20px', marginBottom: '10px', color: '#333' } }, '访问说明');
    container.appendChild(sectionTitle);

    var noteList = createElement('ul', { style: { paddingLeft: '20px', lineHeight: '1.8' } });
    accessNotes.forEach(function(note) {
      var li = createElement('li', { style: { fontSize: '14px', color: '#444' } }, note);
      noteList.appendChild(li);
    });
    container.appendChild(noteList);
  }

  // 页面主入口：在页面中插入功能区域
  function init() {
    // 查找或创建容器
    var mainContainer = document.getElementById('site-helper-container');
    if (!mainContainer) {
      mainContainer = createElement('div', { id: 'site-helper-container' });
      var target = document.body;
      if (target) {
        target.appendChild(mainContainer);
      } else {
        return;
      }
    }

    // 清空容器
    mainContainer.innerHTML = '';

    // 设置容器样式
    mainContainer.style.cssText = 'max-width: 800px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;';

    // 添加标题及站点链接
    var header = createElement('div', { style: { marginBottom: '15px' } });
    var mainTitle = createElement('h2', { style: { color: '#222', margin: '0 0 5px 0' } }, config.cardTitle);
    var siteLink = createElement('a', {
      href: config.siteUrl,
      target: '_blank',
      style: { color: '#007bff', textDecoration: 'none', fontSize: '14px' }
    }, config.siteUrl);
    var introMsg = createElement('p', { style: { fontSize: '14px', color: '#666', margin: '10px 0' } }, config.cardMessage);
    header.appendChild(mainTitle);
    header.appendChild(siteLink);
    header.appendChild(introMsg);
    mainContainer.appendChild(header);

    // 渲染各个部分
    renderTipCards(mainContainer);
    renderBadges(mainContainer);
    renderAccessNotes(mainContainer);
  }

  // 在 DOM 加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();