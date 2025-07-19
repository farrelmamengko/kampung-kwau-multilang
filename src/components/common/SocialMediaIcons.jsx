import React from 'react';

const SocialMediaIcons = ({ className = "btn btn-outline-light btn-social", showTitle = false, containerClass = "d-flex pt-2" }) => {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/kampungkwaupapua',
      icon: 'fab fa-facebook-f',
      fallback: 'f'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/kampungkwaupapua',
      icon: 'fab fa-twitter',
      fallback: 't'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/kampungkwaupapua',
      icon: 'fab fa-instagram',
      fallback: 'i'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@kampungkwaupapua',
      icon: 'fab fa-youtube',
      fallback: 'yt'
    }
  ];

  return (
    <div className={containerClass}>
      {socialLinks.map((social, index) => (
        <a
          key={index}
          className={className}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          title={social.name}
        >
          <i className={social.icon}></i>
          {showTitle && <span className="ms-1">{social.name}</span>}
        </a>
      ))}
    </div>
  );
};

export default SocialMediaIcons; 