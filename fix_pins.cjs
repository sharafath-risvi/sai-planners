const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('/Users/sharafath.risviicloud.com/Documents/SAIPLANNERS/sai-planners/src/components', (filePath) => {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    let original = content;
    
    // Pattern 1: <section ref={containerRef}
    // We want to remove the ref from section and wrap it in a div that has the ref.
    if (content.includes('<section ref={containerRef}')) {
      content = content.replace(/<section ref={containerRef}/g, '<div ref={containerRef}>\n      <section');
      
      // We need to add </div> after the closing </section> of this specific section.
      // Since it's hard to parse, we can just replace the LAST </section> in the return block if we know the structure.
      // Almost all these files end with:
      //     </section>
      //   );
      // }
      // Or
      //     </section>
      //     </>
      //   );
      // }
      
      content = content.replace(/<\/section>\n\s*\);/g, '</section>\n    </div>\n  );');
      content = content.replace(/<\/section>\n\s*<\/>\n\s*\);/g, '</section>\n    </div>\n    </>\n  );');
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
