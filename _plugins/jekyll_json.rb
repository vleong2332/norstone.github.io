require 'json'

module Jekyll
    class JSONTag < Liquid::Tag
        def initialize(tag_name, text, tokens)
            @key = text.strip
            super
        end
        def render(context)
            if context['page'].class != 'Hash'
              @data = context['page']
            else
              @data = context['page'].hash_for_json
            end
            return @key.split('.').inject(@data) { |h,k| h[k] }.to_json
        end
    end
end

Liquid::Template.register_tag('yaml_to_json', Jekyll::JSONTag)
