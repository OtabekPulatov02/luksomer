// Projects page specific functionality

// Project filtering is already handled in main.js
// This file can be extended with additional project-specific features

// Example: Project data (can be extended)
const projectsData = [
    {
        id: 1,
        title: 'Реконструкция ЛЭП 220 kV Самарканд',
        description: 'Модернизация высоковольтных линий электропередач с установкой современного оборудования',
        category: 'lines',
        year: 2023,
        location: 'Самарканд',
        image: 'https://images.unsplash.com/photo-1629713850845-8bd09bfb648f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
    },
    {
        id: 2,
        title: 'Уличное освещение города Ташкент',
        description: 'Установка энергоэффективных LED-систем освещения на основных магистралях',
        category: 'lighting',
        year: 2024,
        location: 'Ташкент',
        image: 'https://images.unsplash.com/photo-1708440889870-a2538074d177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
    },
    {
        id: 3,
        title: 'Подстанция 110/10 kV',
        description: 'Строительство новой трансформаторной подстанции для промышленной зоны',
        category: 'substation',
        year: 2023,
        location: 'Бухара',
        image: 'https://images.unsplash.com/photo-1509390144018-eeaf65052242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
    },
    {
        id: 4,
        title: 'Электроснабжение строительного объекта',
        description: 'Комплексная система электроснабжения для крупного строительного проекта',
        category: 'power',
        year: 2024,
        location: 'Ташкент',
        image: 'https://images.unsplash.com/photo-1674062333283-41a1b59f0408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
    },
    {
        id: 5,
        title: 'ЛЭП 35 kV проект SCO',
        description: 'Строительство линий электропередач в рамках международного проекта',
        category: 'lines',
        year: 2022,
        location: 'Наманган',
        image: 'https://images.unsplash.com/photo-1629713850845-8bd09bfb648f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
    },
    {
        id: 6,
        title: 'Дорожное освещение трассы М39',
        description: 'Установка системы освещения на участке автомагистрали',
        category: 'lighting',
        year: 2023,
        location: 'Самарканд-Бухара',
        image: 'https://images.unsplash.com/photo-1708440889870-a2538074d177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
    }
];

// Function to get project by ID
function getProjectById(id) {
    return projectsData.find(project => project.id === parseInt(id));
}

// Function to get projects by category
function getProjectsByCategory(category) {
    if (category === 'all') {
        return projectsData;
    }
    return projectsData.filter(project => project.category === category);
}

// Function to get recent projects
function getRecentProjects(limit = 3) {
    return projectsData
        .sort((a, b) => b.year - a.year)
        .slice(0, limit);
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        projectsData,
        getProjectById,
        getProjectsByCategory,
        getRecentProjects
    };
}

console.log('Projects module loaded');
