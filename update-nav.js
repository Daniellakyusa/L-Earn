const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\User\\Desktop\\L-Earn';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');

    // Make sure we have the correct navigation structure
    const baseLinks = [
        { href: 'index.html', text: 'Home' },
        { href: 'about.html', text: 'About Us' },
        { href: 'problem.html', text: 'Problem' },
        { href: 'solution.html', text: 'Solution' },
        { href: 'innovation.html', text: 'Innovation' },
        { href: 'budget.html', text: 'Budget' },
        { href: 'team.html', text: 'Team' },
        { href: 'contact.html', text: 'Contact' }
    ];

    let itemsHtml = baseLinks.map(link => {
        const isActive = file === link.href ? ' class="active"' : '';
        return `                <li><a href="${link.href}"${isActive}>${link.text}</a></li>`;
    }).join('\n');

    const regex = /<ul class="nav-menu">[\s\S]*?<\/ul>/;
    const replacement = `<ul class="nav-menu">\n${itemsHtml}\n            </ul>`;
    
    // Also inject floating banner if it's missing (only about.html & index.html might have it fully modified, contact.html has different structure maybe, but let's leave banner global inject since they already have nav)
    content = content.replace(regex, replacement);
    fs.writeFileSync(p, content);
});

console.log("Navigations updated");
