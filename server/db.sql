CREATE database stars;

use stars;

create table stars(
star_id SERIAL primary key,
post_id INT not null,
stars numeric(2,1)
);

CREATE OR REPLACE FUNCTION update_post_rate()
RETURNS TRIGGER AS $$
BEGIN
    
    UPDATE post
    SET rate = (
        SELECT AVG(stars)
        FROM stars
        WHERE article_id = NEW.article_id
    )
    WHERE post_id = NEW.article_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER stars_update_trigger
AFTER INSERT OR UPDATE OR DELETE ON stars
FOR EACH ROW
EXECUTE FUNCTION update_post_rate();
